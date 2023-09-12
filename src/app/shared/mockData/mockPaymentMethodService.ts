import { Injectable } from '@angular/core';
import { PaymentMethodService } from '@core/services';
import { of } from 'rxjs';

export const MockIssuerList = [
    {
        value: 385,
        desc: 'Ngân hàng TMCP Kỹ thương',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/7F4311723CD037882651C10290A48987.jpg',
    },
    {
        value: 421,
        desc: 'abc34333',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/A59410EADF3D2617C5E5BE25327C18F3.jpg',
    },
    {
        value: 416,
        desc: 'abc3',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/58EDD71121E9906AB9C965902A83A9D4.jpg',
    },
    {
        value: 419,
        desc: 'abc34',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/E4550C3E2BE2B15C98B2357F8A7B8230.jpg',
    },
    {
        value: 423,
        desc: 'an ninh',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/29703AE7C5210A93A3C803047BD2B93F.jpg',
    },
    {
        value: 436,
        desc: '4j4275df',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/F930EF348437CE851516B4BDF0F179CD.jpg',
    },
    {
        value: 446,
        desc: 'an',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/C1C45E86068FF25EF9C7B7520115B0C7.jpg',
    },
    {
        value: 383,
        desc: 'Ngân hàng TMCP Ngoại Thương Việt Nam',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/E93613E1724968583B5D19D089D356F4.jpg',
    },
    {
        value: 386,
        desc: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/B91D562DAEADB7A2AAD6FD247A43263D.jpg',
    },
    {
        value: 463,
        desc: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/900A73BF66A895E7D7EA7AF0471230C5.jpg',
    },
    {
        value: 468,
        desc: 'Momo',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/66A7D5AD5FF44159C3C85C72261080F5.jpg',
    },
    {
        value: 471,
        desc: 'Momo123',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/C3227F93CA12BF835235BEC37B1791EA.jpg',
    },
    {
        value: 472,
        desc: 'Payoo',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/CD0DEDCDB3423582309D77D022CA4450.jpg',
    },
    {
        value: 473,
        desc: 'Vnpay',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/12D4584BB6E2CE6B36ACF35499215FFD.jpg',
    },
    {
        value: 474,
        desc: 'ACB',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/2C57BDE0844AB8311AFA536398784878.jpg',
    },
    {
        value: 475,
        desc: 'MSB',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/55AB1F99AC0DEABF4D85831733DDF251.jpg',
    },
    {
        value: 477,
        desc: 'TPbank',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/60F4C1E1AA8D75525B889B55DEE613C7.jpg',
    },
    {
        value: 430,
        desc: 'bdfgb df',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/DF5EABB9F8E47033647862C2DC6ED85F.jpg',
    },
    {
        value: 432,
        desc: '4425df',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/313ABD8A14182B4DF711B0A29CDB14F3.jpg',
    },
    {
        value: 434,
        desc: '4j425df',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/1BCF628177C8A7BA9F5ED60A1E671254.jpg',
    },
    {
        value: 410,
        desc: 'abc',
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/issuer/logo/142B86A4AE6929F976C17C140CF4F749.jpg',
    },
]
export const MockPMStatusList = [
    {
        value: 'active',
        desc: 'Active',
    },
    {
        value: 'locked',
        desc: 'Inactive',
    },
    {
        value: 'wait',
        desc: 'PendingApproval',
    },
    {
        value: 'reject',
        desc: 'Rejected',
    },
]
export const MockPMList = [
    {
        method_id: 321,
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/C8408FFE3C92E3F6EA34B632C0669ABA.jpg',
        des: 'Thanh toán qua thẻ ATM nội địa',
        status: 'Active',
        method_name: 'Thẻ ATM nội địa',
        created_date: '07/08/2020',
        creator: 'Ngô Đức Thành',
    },
    {
        method_id: 301,
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/17781F65083036410797BD02AF31CDB7.jpg',
        des: null,
        status: 'Inactive',
        method_name: 'VNPTpay',
        created_date: '10/07/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 281,
        logo: null,
        des: null,
        status: 'PendingApproval',
        method_name: 'VNpay QR',
        created_date: '30/06/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 261,
        logo: null,
        des: null,
        status: 'PendingApproval',
        method_name: 'MOMO',
        created_date: '29/06/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 247,
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/66342BFF36FBB97C585CAF88BBF9E126.jpg',
        des: null,
        status: 'PendingApproval',
        method_name: 'Tên Phương thức',
        created_date: '11/06/2020',
        creator: 'Trần Trụi Trọng',
    },
    {
        method_id: 246,
        logo: null,
        des: 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
        status: 'PendingApproval',
        method_name: 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',
        created_date: '11/06/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 245,
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/069225B4AC860E8675F01DE2A834C0CB.jpg',
        des: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
        status: 'PendingApproval',
        method_name: 'rrrrr',
        created_date: '11/06/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 244,
        logo: null,
        des: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer',
        status: 'PendingApproval',
        method_name: 'Vin ID',
        created_date: '11/06/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 243,
        logo: 'http://35.223.25.100:8008/vtl-pg/mm/media/payment_method/logo/EF33860AD506864D3FE97D1F4AA761B0.jpg',
        des: '11111111',
        status: 'PendingApproval',
        method_name: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
        created_date: '11/06/2020',
        creator: 'Chinhnguyen',
    },
    {
        method_id: 242,
        logo: null,
        des: '111111111111111111111111111111111111111111111111111111111111111',
        status: 'PendingApproval',
        method_name: 'Test 1',
        created_date: '11/06/2020',
        creator: 'Tạ Hữu Công',
    },
]
@Injectable()
export class MockPaymentMethodService extends PaymentMethodService {
    getIssuerList() {
        return of({
            error_code: '00',
            list_data: MockIssuerList
        })
    }
    getPMbyId(body: any) {
        const result = MockPMList.filter((x: any) => x.method_id === Number(body.method_id));
        const output: any = (result.length > 0) ? result[0] : undefined;
        if (output) {
            output.issuer = [
                { id: MockIssuerList[0].value },
                { id: MockIssuerList[1].value },
                { id: MockIssuerList[2].value },
            ];
        }
        const res = (result.length > 0) ? {
            error_code: '00',
            data: output
        } :
            {
                error_code: '04',

            }
        return of(res);
    }
}