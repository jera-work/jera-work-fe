import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyResDto } from "@dto/company/company.res.dto";
import { ADMIN_API } from "@constant/api.constant";

@Injectable({
    providedIn : 'root'
})
export class CompanyService {

    constructor (private base : BaseService) {}

    getAllCompany() : Observable<CompanyResDto[]>{
        return this.base.get<CompanyResDto[]>(`${ADMIN_API}/companies`)
    }
}