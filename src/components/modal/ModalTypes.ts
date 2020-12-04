export interface ModalProps {
    show: boolean,
    hide : () => void
    bodyContent : any
    footerContent? : any
    title : string
    className? : string
    classNameBody? : string
}


export interface IModal{
   mode : Modes.create | Modes.update | ''
   show : boolean
}

export enum Modes {
    create = 'create',
    update = 'update',
}
