import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadFileService } from '../upload-file.service';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-question-bank',
  templateUrl: './add-question-bank.component.html',
  styleUrls: ['./add-question-bank.component.css']
})
export class AddQuestionBankComponent implements OnInit {


  selectedFiles: FileList;
  currentFileUpload: File;
  QuestionBank: FormGroup;
  constructor(private fb: FormBuilder,
    private candidateService: CandidateService,
    private router: Router,
    private uploadService: UploadFileService) { }

  ngOnInit() {


    this.QuestionBank = this.fb.group({

      file: ['', Validators.required]
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }



  upload() {

    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      console.log(event);
      console.log('File is completely uploaded!');

    })

    this.selectedFiles = undefined
  }


}
