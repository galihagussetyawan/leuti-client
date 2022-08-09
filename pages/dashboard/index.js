import { getCookie } from "cookies-next";
import AuthService from "../../services/auth.service";

export default function Dashboard() {
    return (
        <>
            <main>dashboard</main>
        </>
    );
}

export async function getServerSideProps(context) {

    const { req, res } = context;

    const cookies = getCookie('user', { req, res });

    try {

        const isAdmin = await AuthService.isAdmin(JSON.parse(cookies).accessToken);

        if (!isAdmin) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

    } catch (error) {

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