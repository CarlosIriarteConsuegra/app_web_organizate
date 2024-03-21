import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';

@Injectable()
export class RolService extends BaseService {

  constructor(http: HttpClient, private messageService: MessageService, configUrlService: ConfigUrlService) {
    super(http, configUrlService);
  }
}
