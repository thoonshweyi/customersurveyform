import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import pro1globallogo from "./../assets/icons/pro1globallogo.png";

export default function FullPageLoader() {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-darks bg-opacity-100"
            style={{ zIndex: 9999 }}
        >
            <div className="text-center">
                <img
                    src={pro1globallogo}
                    alt="logo"
                    className="d-block mb-3"
                    style={{ width: "160px" }}
                />

                <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-primary text-5xl animate-spin"
                    style={{ fontSize: "3rem" }}
                />

                {/* <div className="text-light mt-2 small">
                    Loading...
                </div> */}
            </div>
        </div>
    );
}