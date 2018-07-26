import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PendingQuestionComponent } from './pending-question/pending-question.component';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { AddCandidateComponent } from './add-candidate/add-candidate.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { TakeInterviewComponent } from './take-interview/take-interview.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { AddQuestionBankComponent } from './add-question-bank/add-question-bank.component';
import { DashboardComponent } from './dashboard/dashboard.component';  

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule,Routes} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InterviewQuestionComponent } from './interview-question/interview-question.component';
import {CardModule} from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ConfigureInterviewComponent } from './configure-interview/configure-interview.component';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { QuestionResolverService } from './question-resolver.service';
import { DatePipe } from '../../node_modules/@angular/common';
import { ReportComponent } from './report/report.component';
import { UploadFileService } from './upload-file.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserResolverService } from './user-resolver.service';
import { NotAssignedPipe } from './not-assigned.pipe';


const routes: Routes =[
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'home',component:HomeComponent, canActivate: [AuthGuard],
    children:[
      {path:'', redirectTo:'dashboard', pathMatch:'full'},
      {path:'dashboard',component:DashboardComponent},
      {path:'changePassword', component:ChangePasswordComponent},
      {path:'user/add', component:AddUserComponent}, 
      {path:'user/view',component:ViewUserComponent,
        resolve: {allUsers: UserResolverService},
        children: [
         {path: 'edit/:userId', component: AddUserComponent}
        ]
      },
      {path:'candidate/add', component:AddCandidateComponent},
      {path:'candidate/view', component:ViewCandidateComponent},
      {path:'questions/pending', component:PendingQuestionComponent},
      {path:'questions/add', component:AddQuestionComponent},
      { path: 'questions/bank', component: AddQuestionBankComponent },
      {path:'questions/view', component:ViewQuestionComponent,
            resolve: {allProducts: QuestionResolverService},
            children: [
              {path: 'edit/:questionId', component: AddQuestionComponent}
            ]
      },
      {path:'interview/show-candidates', component:TakeInterviewComponent},
      {path:'interview/start', component:InterviewQuestionComponent},
      {path:'report', component:ReportComponent},
      {path:'configure-interview', component:ConfigureInterviewComponent}
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PendingQuestionComponent,
    ViewCandidateComponent,
    AddCandidateComponent,
    ViewQuestionComponent,
    AddQuestionComponent,
    TakeInterviewComponent,
    ViewUserComponent,
    AddUserComponent,
    NavigationComponent,
    TopnavbarComponent,
    AddQuestionBankComponent,
    DashboardComponent,
    InterviewQuestionComponent,
    ConfigureInterviewComponent,
    ReportComponent,
    ChangePasswordComponent,
    NotAssignedPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DataViewModule,
    PanelModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    CardModule,
    TableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard, 
    AuthenticationService,
    UserResolverService,
    UploadFileService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
