import RegisterForm from "../../member1/components/RegisterForm";
const Register = () => {
    return (
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
                <section className="m-full max-w-md">
                <RegisterForm />
                </section>
            </div>
        </main>
    );
};

export default Register;