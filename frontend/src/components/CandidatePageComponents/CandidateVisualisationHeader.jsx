import '../../styles/candidateVisualisation.css'

function CandidateVisualisationHeader({name, linkedIn, github, email, jobDesig, degree, major}) {
    return (
        <div className="flex flex-row justify-evenly h-60 font-light">
            <div className="w-1/2 mr-1 ml-2 my-2 px-4 flex flex-col justify-evenly align-start text-left">
                <div>
                    <p className='text-2xl font-normal'> {name} </p>
                    <p className='text-xl'> For {jobDesig} </p>
                </div>

                <div>    
                    <p className='text-sm'> <span className='font-medium'> Degree </span> {degree} </p>
                    <p className='text-sm'> <span className='font-medium'>  Major </span> {major} </p>
                </div>

                <div className='grid sm:grid-cols-1 md:grid-cols-1 md:grid-cols-auto-fit'>
                    <span className='flex align-center'>
                        <i class="fa-brands fa-linkedin mr-1 flex align-self-center" /> <a href={linkedIn} className='text-sm underline pointer'> {linkedIn} </a>
                    </span>
                    <span className='flex align-center'>
                        <i class="fa-brands fa-github  mr-1 flex align-self-center" /> <a href={github} className='text-sm underline pointer'> {github} </a>
                    </span>
                    <span className='flex align-center'>
                        <i class="fa-solid fa-envelope  mr-1 flex align-self-center" /> <a href={email} className='text-sm underline pointer'> {email} </a>
                    </span>
                </div>
            </div>
            <div className="w-1/2 bg-red-100 ml-1 mr-2 my-2"></div>
        </div>
    )
}

export { CandidateVisualisationHeader }