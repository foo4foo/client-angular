import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParliamentService } from '../../../services/parliament-service/parliament.service';

@Component({
  selector: 'app-parliament-home',
  templateUrl: './parliament-home.component.html',
  styleUrls: ['./parliament-home.component.scss']
})
export class ParliamentHomeComponent implements OnInit {

  tenants_id: any;
  parl_status: String;
  parl_id: any = 0;
  loading: boolean;
  is_supervisor = false;

  constructor(private activeRoute: ActivatedRoute,
    private parliamentService: ParliamentService, ) { }

  ngOnInit() {
    localStorage.setItem('sidebar', 'tenant');
    localStorage.setItem('navbarTitle', 'Skupština stanara');

    this.activeRoute.params.subscribe(params => {
      this.tenants_id = (params['id']);
    });

    this.getParliamentStatus();
  }

  // statuses: NONE, ANNOUNCED, VOTING, VOTED
  getParliamentStatus() {
    this.parliamentService.checkParliamentStatus(this.tenants_id).subscribe((res: any) => {
      this.parl_status = res.status;
      this.parl_id = res.parlId;
      this.loading = false;
      const token = JSON.parse(localStorage.getItem('token'));
      for (const tenant of token.tenants) {
        if (tenant.tenant === this.tenants_id) {
          if (tenant.supervisor) {
            this.is_supervisor = true;
          } else {
            this.is_supervisor = false;
          }
        }
      }
    });
  }

}
