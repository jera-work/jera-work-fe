import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CompanyService } from '@services/company.service';
import { MessageService } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['company-create.styles.css'],
})
export class CompanyCreateComponent implements OnInit {
  loading = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private title: Title,
    private router: Router,
    private companyService: CompanyService,
    private messageService: MessageService
  ) {}

  companyInsertReqDto = this.fb.group({
    companyCode: ['', Validators.required],
    companyName: ['', Validators.required],
    fileContent: ['', Validators.required],
    fileExt: ['', Validators.required],
    address: ['', Validators.required],
    description: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  ngOnInit(): void {
    this.title.setTitle('Create Company');
  }

  fileUpload(event: any) {
    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === 'string') resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });

    for (let file of event.files) {
      toBase64(file).then((result) => {
        const resultBase64 = result.substring(
          result.indexOf(',') + 1,
          result.length
        );
        const resultExtension = file.name.substring(
          file.name.indexOf('.'),
          file.name.length
        );
        this.companyInsertReqDto.patchValue({
          fileExt: resultExtension,
          fileContent: resultBase64,
        });
      });
    }
  }
  onSubmit() {
    if (this.companyInsertReqDto.valid) {
      this.loading = true;
      const data = this.companyInsertReqDto.getRawValue();

      firstValueFrom(this.companyService.insertCompany(data))
        .then((res) => {
          console.log(res);
          this.router.navigateByUrl('/companies');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please complete the data requirements!',
      });
      this.loading = false;
    }
  }
}
