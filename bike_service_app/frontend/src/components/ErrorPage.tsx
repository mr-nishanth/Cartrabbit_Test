import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError() as any;
    return (
        <div>
            <h1>Oops! something went wrong😔</h1>
            <p>
                <strong>
                    Error : {error.statusText} {error.status}
                </strong>
            </p>
            <p>
                <Link
                    to={'/'}
                    className='text-blue-600 underline'
                >
                    Go to Homepage
                </Link>
            </p>
        </div>
    );
};
export default ErrorPage;
