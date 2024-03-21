import { Injectable, APP_INITIALIZER } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ConfigUrlService {

    private _config!: any
    private _env!: string;

    constructor(private _http: HttpClient) { }
    load() {
        return new Promise(async (resolve, reject) => {
            this._env = 'development';
            if (environment.production)
                this._env = 'production';
            console.log(this._env);
            this._http.get('/assets/config/' + this._env + '.json').subscribe({
                next: async (data) => {
                    this._config = data;
                    environment.microproxy_cursos = this.getApi("microproxy_cursos");
                    environment.microproxy_seguridad = this.getApi("microproxy_seguridad");
                    resolve(true);
                },
                error: async (error) => {
                    console.error(error);
                    return (error.json().error || 'Server error');
                }
            });
        });
    }
    // Is app in the development mode?
    isDevmode() {
        return this._env === 'development';
    }
    // Gets API route based on the provided key
    getApi(key: string): string {
        return this._config["API_ENDPOINTS"][key];
    }
    // Gets a value of specified property in the configuration file
    get(key: any) {
        return this._config[key];
    }
}

export function ConfigFactory(config: ConfigUrlService) {
    return () => config.load();
}

export function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: ConfigFactory,
        deps: [ConfigUrlService],
        multi: true
    }
}

const ConfigUrlModule = {
    init: init
}

export { ConfigUrlModule };