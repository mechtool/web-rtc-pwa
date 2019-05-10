export class SideNavItem {
    constructor(public text : string = '',  public className: string = '', public href? : string, public icon? : string ,  public children? : SideNavItem[], public fragment? : string, public active? : boolean){}
}

export class Contact{
    constructor(public name : string, public imgUrl : string = '/assets/icons/app-shell/contact.png', public uid : string){}
}
