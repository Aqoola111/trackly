import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";
import AuthClientPage from "@/feautres/auth/auth-client-page";
import {headers} from "next/headers";

export default async function Page() {
	const session = await auth.api.getSession({
		headers: await headers()
	});
	
	if (session) redirect("/habits");
	
	return <AuthClientPage/>;
}
