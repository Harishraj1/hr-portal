import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000";

const loaderStyle = {
    height: 100 + "%", 
    width: 100 + "vw", 
    position: "absolute", 
    backgroundColor: "rgba(0, 0, 0, 0.692)", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    zIndex: 99
};

function Loader() {
    return(
        <div style={loaderStyle}>
            <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#007bff">
                <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
                    <circle cx="22" cy="22" r="6" stroke-opacity="0">
                        <animate attributeName="r"
                            begin="1.5s" dur="3s"
                            values="6;22"
                            calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                            begin="1.5s" dur="3s"
                            values="1;0" calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-width"
                            begin="1.5s" dur="3s"
                            values="2;0" calcMode="linear"
                            repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="6" stroke-opacity="0">
                        <animate attributeName="r"
                            begin="3s" dur="3s"
                            values="6;22"
                            calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-opacity"
                            begin="3s" dur="3s"
                            values="1;0" calcMode="linear"
                            repeatCount="indefinite" />
                        <animate attributeName="stroke-width"
                            begin="3s" dur="3s"
                            values="2;0" calcMode="linear"
                            repeatCount="indefinite" />
                    </circle>
                    <circle cx="22" cy="22" r="8">
                        <animate attributeName="r"
                            begin="0s" dur="1.5s"
                            values="6;1;2;3;4;5;6"
                            calcMode="linear"
                            repeatCount="indefinite" />
                    </circle>
                </g>
            </svg>
        </div>
    );
}

function InputGroup({name, type, placeHolder, value, setter}) {
    return(
        <div className="flex flex-col items-start">
            <label className="block text-gray-600 text-sm mb-1" htmlFor={type}>
              {name}
            </label>
            <input
              type={type}
              id={type}
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={placeHolder}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export {Loader, InputGroup, baseUrl as baseURL, api};