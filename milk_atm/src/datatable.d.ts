import 'datatables.net';
declare module 'datatables.net' {
    interface Settings {
        responsive?: boolean | object;
    }
}
declare global {
    interface Window {
        bootstrap: any;
    }
}