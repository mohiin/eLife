import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config/url';

const SuccessPage = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState("Verifying payment...");

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const res = await axios.get(`${backendUrl}/order/verify?session_id=${sessionId}`);
                if (res.data.success) {
                    setStatus("Payment verified! Thank you for your order.");
                } else {
                    setStatus("Payment incomplete or failed.");
                }
            } catch (err) {
                setStatus("Error verifying payment.");
            }
        };

        if (sessionId) {
            verifyPayment();
        } else {
            setStatus("Missing session ID.");
        }
    }, [], [sessionId]);

    return <div>{status}</div>;
};

export default SuccessPage;
