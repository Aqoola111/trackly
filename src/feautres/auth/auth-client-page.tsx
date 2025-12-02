'use client';

import {Logo} from "@/components/Logo";
import {SignInCard} from "@/feautres/auth/sign-in-card";
import {SignUpCard} from "@/feautres/auth/sign-up-card";
import {useState} from "react";

export type authFlowType = 'sign-in' | 'sign-up';

const AuthClientPage = () => {
	const [authFlow, setAuthFlow] = useState<authFlowType>('sign-in');
	
	return (
		<div className='min-h-screen min-w-screen flex items-center justify-center flex-col gap-2'>
			<Logo/>
			{authFlow === 'sign-in' ? (
				<SignInCard changeFlow={() => setAuthFlow('sign-up')} />
			) : (
				<SignUpCard changeFlow={() => setAuthFlow('sign-in')} />
			)}
		</div>
	);
};

export default AuthClientPage;
