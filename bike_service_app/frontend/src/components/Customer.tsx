import { useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { shallow } from 'zustand/shallow';
import useServiceStore from '../store/useServiceStore';

const Customer = () => {
    const [getAllServicesForCustomer, services, searchString] = useServiceStore(
        (state) => [
            state.getAllServicesForCustomer,
            state.services,
            state.searchString,
        ],
        shallow
    );
    useEffect(() => {
        getAllServicesForCustomer();
    }, [getAllServicesForCustomer]);

    console.log({ searchString });
    return (
        <div className='w-full flex items-center justify-around flex-wrap space-x-3 space-y-3'>
            {services?.length ? (
                services?.map((service) => {
                    console.log({ service });
                    console.log({ OWNER: service?.ownerId?.name });

                    if (
                        searchString &&
                        !service?.name
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                    )
                        return null;
                    return (
                        <ServiceCard
                            service={service}
                            key={service._id}
                        />
                    );
                })
            ) : (
                <div className='text-center p-10'>
                    <p>Whoops! No Service available</p>
                </div>
            )}
        </div>
    );
};

export default Customer;
