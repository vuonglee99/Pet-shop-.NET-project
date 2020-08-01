import { Component, OnInit } from '@angular/core';
import { navItems, userNavItems } from '../../_nav';
import { Router } from '@angular/router';
import { SessionService } from '../../core/services/session.service';
import { UserViewModel, CategoriesService, CATEGORY, CategoryViewModel } from '../../shared/service-proxy.module';
import { UserIdleService } from 'angular-user-idle';
import { UserContextService } from '../../core/services/user-context.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = true;
  public navItems;
  currentUser: UserViewModel;
  isUser: boolean = false;
  cateInput: CATEGORY = new CATEGORY();
  cateList: CategoryViewModel[] = [];
  typeItems: SelectItem[] = [];
  filterCates: any[];
  cateNameList: string[] = [];

  ngOnInit() {
    this.getAllCategory();
    this.currentUser = this.sessionService.getItem("currentUser");
    console.log(this.currentUser);
    if (this.currentUser.role == "admin") {
      this.navItems = navItems;
      this.isUser = false;
    } else {
      this.navItems = userNavItems;
      this.isUser = true;
      console.log("x");
    }
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.logout();
    });

    this.getAllCategory();
  }

  constructor(
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private userContextService: UserContextService,
    private router: Router,
    private categoriesService: CategoriesService
  ) {

  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.userIdle.stopWatching();
    this.userContextService.logout();
    this.router.navigate(['/login']);
  }

  goHome() {
    if (this.isUser) this.router.navigate(['/home/'])
    else this.router.navigate(['/dashboard/']);
  }

  getAllCategory() {
    this.cateInput.parentID = -1;
    this.categoriesService.getAllCategory(this.cateInput).subscribe(res => {
      this.cateList = res;
      for (var i = 0; i < this.cateList.length; i++) {
        this.cateNameList.push(this.cateList[i].name);
      }
    });
  }

  filterCateSingle(event) {
    this.filterCates = [];
    for (let i = 0; i < this.cateNameList.length; i++) {
      let cate = this.cateNameList[i];
      if (cate.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
        this.filterCates.push(cate);
      }
    }
  }

  redirectTo(uri: string, cate_id: any) {
    uri += "/" + cate_id;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate([uri]));
}
}
