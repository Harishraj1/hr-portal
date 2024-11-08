import '../../styles/candidateVisualisation.css'

function CandidateVisualisationBody() {
    const visualisations = [1, 2, 3, 4, 5, 4, 8, 4]
    const colors = [
        'bg-pink-100',
        'bg-purple-100',
        'bg-blue-100',
        'bg-green-100',
        'bg-yellow-10',
        'bg-gray-50',
        'bg-gray-100',
        'bg-gray-200',
        'bg-blue-gray-100'
    ]

    return (
        <div className="flex flex-grow flex-col justify-evenly bg-blue-50">
            {
                visualisations && visualisations.map((index) => {
                    <div className='grid grid-col'>

                    </div>
                })
            }
        </div>
    )
}

export default CandidateVisualisationBody;