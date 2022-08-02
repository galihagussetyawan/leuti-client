import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import AuthService from "../../services/auth/auth.service";

export default function Dashboard() {


    // useEffect(() => {

    //     AuthService.isAdmin()
    //         .then(res => console.log(res.data.data))
    //         .catch(error => console.log(error.response.data));
    // }, [])

    return (
        <>
            <main>dashboard</main>
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    const cookies = getCookie('user', { req, res });

    const isAdmin = await AuthService.isAdmin(JSON.parse(cookies).accessToken);

    if (!isAdmin) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}