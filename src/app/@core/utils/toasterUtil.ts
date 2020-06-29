import { ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

// Toaster Config
export function getToasterSettings(params) {

    let position: string = params.position || 'toast-top-right';
    let timeout: number = params.timeout || 5000;
    let isNewestOnTop: boolean = (typeof params.isNewestOnTop === 'boolean') ? params.isNewestOnTop : true;
    let isHideOnClick: boolean = (typeof params.isHideOnClick === 'boolean') ? params.isHideOnClick : true;
    let isDuplicatesPrevented: boolean = params.isDuplicatesPrevented || false;
    let animationType: string = params.animationType || 'fade';
    let toastsLimit: number = params.toastsLimit || 2;

    let type: string = params.type || 'error';
    let tempTitle: string;

    if (type === 'error') {
        tempTitle = 'ERROR';
    } else if (type === 'success') {
        tempTitle = 'EXITO'
    } else if (type === 'info') {
        tempTitle = 'INFORMACION'
    } else if (type === 'warning') {
        tempTitle = 'ALERTA'
    } else {
        tempTitle = 'MENSAJE'
    }

    let title: string = params.title || tempTitle;
    let message: string = params.message || 'Hubo un error, contacta el administrador';
    let isCloseButton: boolean = (typeof params.isCloseButton === 'boolean') ? params.isCloseButton : true;

    const config = new ToasterConfig({
        positionClass: position,
        timeout: timeout,
        newestOnTop: isNewestOnTop,
        tapToDismiss: isHideOnClick,
        preventDuplicates: isDuplicatesPrevented,
        animation: animationType,
        limit: toastsLimit,
    });

    const toast: Toast = {
        type: type,
        title: title,
        body: message,
        timeout: timeout,
        showCloseButton: isCloseButton,
        bodyOutputType: BodyOutputType.TrustedHtml
    };

    return { config, toast }
}