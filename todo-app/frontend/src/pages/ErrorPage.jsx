import { NavLink, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div>
            <h1>Oops! something went wrong😔</h1>
            <p>
                <strong>
                    Error : {error.statusText} {error.status}
                </strong>
            </p>
            <p>
                <NavLink
                    to={'/'}
                    className='text-blue-600 underline'
                >
                    Go to Homepage
                </NavLink>
            </p>
        </div>
    );
};
export default ErrorPage;
