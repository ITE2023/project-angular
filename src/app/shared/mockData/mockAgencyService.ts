import { AgencyService } from '@core/services';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
export const MockCityList = [{
    value: "01",
    desc: "Thành phố Hà Nội"
},
{
    value: "02",
    desc: "Tỉnh Hà Giang"
}]
export const MockDistrictList = [
    {
        value: "001",
        desc: "Quận Ba Đình"
    },
    {
        value: "002",
        desc: "Quận Hoàn Kiếm"
    }
]
export const MockCommuneList = [
    {
        value: "00001",
        desc: "Phường Phúc Xá"
    },
    {
        value: "00004",
        desc: "Phường Trúc Bạch"
    },
    {
        value: "00006",
        desc: "Phường Vĩnh Phúc"
    }
]

export const MockContractOrServiceStatus = [
  {value: "active", desc: "Active"},
  {value: "locked", desc: "Inactive"},
  {value: "wait", desc: "PendingApproval"},
  {value: "reject", desc: "Rejected"},
]
export const MockAgencyDetail = {
    agency_id: 100141,
    agency_name: "nga",
    agency_biz_name: "nga",
    created_at: "22/05/2020",
    agent_name: "nga",
    agent_phone: "0372426878",
    status: "wait",
    status_name: "PendingApproval",
    agent_email: "lethingale@gmai.com",
    website: null,
    address: "keang nam",
    province: {
        id: "01",
        name: "Thành phố Hà Nội"
    },
    district: {
        id: "019",
        name: "Quận Nam Từ Liêm"
    },
    commune: {
        id: "00625",
        name: "Phường Mỹ Đình 1"
    },
    contract: {
        sign_date: "21/05/2020",
        expire_date: "21/05/2020",
        activated_date: null,
        contract_image: [
            {
                url: "http://35.223.25.100:8002/vtl-pg/mm/media/agency/contract/09169005F7EB059DD763D071A44A6DFA-0.pdf",
                name: "dummy1.pdf"
            },
            {
                url: "http://35.223.25.100:8002/vtl-pg/mm/media/agency/contract/09169005F7EB059DD763D071A44A6DFA-1.png",
                name: "dummy2.png"
            },
            {
                url: "http://35.223.25.100:8002/vtl-pg/mm/media/agency/contract/09169005F7EB059DD763D071A44A6DFA-2.pdf",
                name: "dumm3.pdf"
            }
        ],
        contract_status: 1,
        service_status: 1
    },
    payment_info: {
        settlement_day_display: null,
        settlement_day: null,
        holder_name: null,
        pan: null,
        bank_bin: null,
        bank_name: null
    }
}
@Injectable()
export class MockAgencyService extends AgencyService {

    getAgencyById(body: any): Observable<any> {
        if (body && body.agency_id !== '01') {
            return of<any>({
                error_message: "Thành công",
                error_code: "00",
                data: MockAgencyDetail
            });
        } else {
            return of<any>({
                error_code: "01",
            })
        }

    }
    getList(body: any): Observable<any> {
        return of(
            {
                "error_message": "Lấy dữ liệu thành công",
                "total_record": 22,
                "error_code": "00",
                "list_data": [
                    {
                        "agency_id": 100162,
                        "agency_name": "Đại lý Hà Đông",
                        "agency_biz_name": "ĐL11",
                        "created_at": "27/05/2020",
                        "agent_name": "Trần Đức Min",
                        "agent_phone": "0988774117",
                        "status": "wait",
                        "status_name": "PendingApproval"
                    },
                    {
                        "agency_id": 100161,
                        "agency_name": "Đại lý cấp 1",
                        "agency_biz_name": "ĐLC1",
                        "created_at": "27/05/2020",
                        "agent_name": "Ngô Đức Anh",
                        "agent_phone": "0987778544",
                        "status": "active",
                        "status_name": "Active"
                    },
                    {
                        "agency_id": 100141,
                        "agency_name": "nga",
                        "agency_biz_name": "nga",
                        "created_at": "22/05/2020",
                        "agent_name": "nga",
                        "agent_phone": "0372426878",
                        "status": "wait",
                        "status_name": "PendingApproval"
                    },
                    {
                        "agency_id": 100123,
                        "agency_name": "Đại số số 10",
                        "agency_biz_name": "Dl10",
                        "created_at": "19/05/2020",
                        "agent_name": "44444444444444444444444444444444444444444444444444",
                        "agent_phone": "0799999999",
                        "status": "active",
                        "status_name": "Active"
                    },
                    {
                        "agency_id": 100122,
                        "agency_name": "Đại lý 1",
                        "agency_biz_name": "Đại lý 1",
                        "created_at": "19/05/2020",
                        "agent_name": "Huyền",
                        "agent_phone": "0911111111",
                        "status": "active",
                        "status_name": "Active"
                    },
                    {
                        "agency_id": 100121,
                        "agency_name": "đại lý miền Bắc",
                        "agency_biz_name": "DLMB",
                        "created_at": "19/05/2020",
                        "agent_name": "Phạm T Xuân Lộc",
                        "agent_phone": "0984968689",
                        "status": "wait",
                        "status_name": "PendingApproval"
                    },
                    {
                        "agency_id": 100101,
                        "agency_name": "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",
                        "agency_biz_name": "%%%%%%%%%%",
                        "created_at": "15/05/2020",
                        "agent_name": "%%%%%%%%%%%%%%%%%%%%%%%%  %%%%%%%%%%%%%%%",
                        "agent_phone": "0788999999",
                        "status": "wait",
                        "status_name": "PendingApproval"
                    },
                    {
                        "agency_id": 100081,
                        "agency_name": "Đại lý 04",
                        "agency_biz_name": "Đại lý 04",
                        "created_at": "12/05/2020",
                        "agent_name": "Phạm Thị Thanh Huyền",
                        "agent_phone": "0912333444",
                        "status": "active",
                        "status_name": "Active"
                    },
                    {
                        "agency_id": 100063,
                        "agency_name": "Kiot Việt",
                        "agency_biz_name": "KIOT",
                        "created_at": "07/05/2020",
                        "agent_name": "Nguyễn Văn A",
                        "agent_phone": "0977990098",
                        "status": "wait",
                        "status_name": "PendingApproval"
                    },
                    {
                        "agency_id": 100062,
                        "agency_name": "1234",
                        "agency_biz_name": "Đại lý 04",
                        "created_at": "07/05/2020",
                        "agent_name": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        "agent_phone": "0978877998",
                        "status": "active",
                        "status_name": "Active"
                    }
                ]
            }
        )
    }
    active(request: any) {
        const result = (request && request.agency_id) ? request.agency_id : '00';
        return of({
            error_code: result
        })
    }
    getAddress(request: any) {
        if (request) {
            if (request.key === 'province') {
                return of({
                    error_code: "00",
                    list_data: MockCityList
                })
            }
            if (request.key === 'district') {
                return of({
                    error_code: "00",
                    list_data: MockDistrictList
                })
            }
            if (request.key === 'commune') {
                return of({
                    error_code: "00",
                    list_data: MockCommuneList
                })
            }
        }
    }
    update(type: string, request: any): Observable<any> {
      return this.return00();
    }
    approval(request: any) {
        return of({
            error_code: '0' + request.approve
        })
    }
    updateAccountInfo(request: any) {
      return this.return00();
    }
    getServiceStatus() {
      this.return00();
    }
    getContractStatus() {
      this.return00();
    }

    return00() {
      return of({
        error_code: '00'
      })
    }
}
