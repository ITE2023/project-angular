export class UserInformationModel {
  constructor(
    public id: string,
    public userId: string,
    public userInformation: string,
    public userName: string,
    public pin: number,
    public displayName: string,
    public email: string,
    public lastLoginDate: any,
    public RegisterDate: string,
    // tslint:disable-next-line: variable-name
    public access_token: string,
    // tslint:disable-next-line: variable-name
    public refresh_token: string,
    // tslint:disable-next-line: variable-name
    public token_type: string,
    // tslint:disable-next-line: variable-name
    public expires_in: number,
    public userRoles: any[],
    public userRole: string,
    public listUserRoles: string[],
    public listUserRoleIds: string[],
    public isActive: boolean,
    public isSystemAdmin: boolean,
    public address: string,
    public thumbnailPhoto: string,
    public phone: string,
    public department: string,
    public is_change_password: number,
    public roleId: number,
    public day?: number,
    public notification_code?: string
  ) {}
}
