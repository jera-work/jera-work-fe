import { Component } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { CompanyService } from "@services/company.service";

@Component({
    selector: 'company-create',
    templateUrl: './company-create.component.html',
  })
export class CompanyCreateComponent{

  constructor(private fb: NonNullableFormBuilder,
    private companyService: CompanyService){
  }

  companyInsertReqDto = this.fb.group({
    companyCode : ['', Validators.required],
    companyName : ['', Validators.required],
    fileContent : ['', Validators.required],
    fileExt : ['', Validators.required],
    address : ['', Validators.required],
    description :  ['', Validators.required],
    phoneNumber : ['', Validators.required]
  })

  fileUpload(event: any) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result)
        };
        reader.onerror = error => reject(error);
    });
    
    for (let file of event.files) {
        toBase64(file).then(result => {
          const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
          const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
            this.companyInsertReqDto.patchValue({
                fileExt: resultExtension,
                fileContent: resultBase64
            })
        })
    }
  }

  submit(){
    this.companyService.insertCompany(this.companyInsertReqDto.getRawValue()).subscribe((res) => {
      console.log(res.id)
      console.log(res.message)
    })
  }
}