export default function Loader() {
    return (
        <div className="loader-wrapper">
            <div className="loader">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}