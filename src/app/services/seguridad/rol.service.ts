import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ConfigUrlService } from '../../../core/configUrl-service';
import { LoadingService } from '../../components/loadingWindow/loading.service';

@Injectable()
export class RolService extends BaseService {

  constructor(http: HttpClient, messageService: MessageService, configUrlService: ConfigUrlService, loadingService: LoadingService) {
    super(http, configUrlService, messageService, loadingService);
  }
}
