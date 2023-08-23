import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Observable } from "rxjs";
import { CompanyResDto } from "@dto/company/company.res.dto";
import { ADMIN_API } from "@constant/api.constant";
import { CompanyInsertReqDto } from "@dto/company/company-insert.req.dto";
import { InsertResDto } from "@dto/InsertResDto";

@Injectable({
    providedIn : 'root'
})
export class CompanyService {

    constructor (private base : BaseService) {}

    insertCompany(data: CompanyInsertReqDto): Observable<InsertResDto> {
        return this.base.post<InsertResDto>(`${ADMIN_API}/companies`, data)
    }

    getAllCompany() : Observable<CompanyResDto[]>{
        return this.base.get<CompanyResDto[]>(`${ADMIN_API}/companies`)
    }

    insertCompany(data: CompanyInsertReqDto): Observable<InsertResDto>{
        return this.base.post<InsertResDto>(`${ADMIN_API}/companies`, data ,true)
    }
}