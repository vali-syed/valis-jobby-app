import './index.css'

const employmentTypesList = [
    {
      label: 'Full Time',
      employmentTypeId: 'FULLTIME',
    },
    {
      label: 'Part Time',
      employmentTypeId: 'PARTTIME',
    },
    {
      label: 'Freelance',
      employmentTypeId: 'FREELANCE',
    },
    {
      label: 'Internship',
      employmentTypeId: 'INTERNSHIP',
    },
  ]
  
  const salaryRangesList = [
    {
      salaryRangeId: '1000000',
      label: '10 LPA and above',
    },
    {
      salaryRangeId: '2000000',
      label: '20 LPA and above',
    },
    {
      salaryRangeId: '3000000',
      label: '30 LPA and above',
    },
    {
      salaryRangeId: '4000000',
      label: '40 LPA and above',
    },
  ]

const FiltersGroup = () => {
    return (
        <div>
            <h1 className="filter-group-heading">Type of Employment</h1>
            <ul className="filter-group-list">
                {
                    employmentTypesList.map(eachItem =>(
                        <li key={eachItem.employmentTypeId}>
                            <input type="checkbox" id={eachItem.employmentTypeId} />
                            <label htmlFor={eachItem.employmentTypeId} className="filter-group-label">{eachItem.label}</label>
                        </li>
                    ))
                }
            </ul>
            <hr className="separator"/>
            <h1 className="filter-group-heading">Salary Range</h1>
            <ul className="filter-group-list">
                {
                    salaryRangesList.map(eachItem=>(
                        <li>
                            <input type="radio" id={eachItem.salaryRangeId} />
                            <label htmlFor={eachItem.salaryRangeId} className="filter-group-label">{eachItem.label}</label>
                        </li>
                    ))
                }
            </ul>
        </div>
    )

}

export default FiltersGroup;