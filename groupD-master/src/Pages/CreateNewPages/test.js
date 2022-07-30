class NewAcademicTerm extends Component{ 
    constructor(props){
        super(props)
        this.state ={
            terms: [],
            year: ""
     
        } 
    async componentDidMount (){
        const baseURL = window.localStorage.getItem('baseURL');
        const token = window.localStorage.getItem('token');

        try{

        const academicTerms = await axios({
            method: 'get',
            url: baseURL+'admin/academic-years',
            headers: {
                // created headers with Bearer token
                // Without bearer token, api will not allow user to make changes 
              Authorization : 'Bearer ' +token
            }
            
        }).then((response)=>{
            console.log(response.data);
            this.setState({terms:response.data})

        });

    } catch (error){
        
    }
    }
    
    

    render(){
        const  {terms} = this.state;
        console.log(terms);
        return (
            <div>
                <h1>ACADEMIC TERM</h1>
                <label> Academic Year</label>
                <select >
                {terms.map(year => {
                        
                            })}
                            </select> 
                            <label>Semester Name</label> 
                            <select>
                                <option value={'First Semester'}>First Semester</option>
                                <option value={'Second Semester'}>Second Semester</option>
                            </select>
                            <button >Save</button>
                            <button onClick={()=> this.props.navigation.navigate('/')}>Cancel</button>
            </div>
        ) 
    }


    const App = () => {

        const [addrtype, setAddrtype] = useState(["Work", "Home", "school"])
        const Add = addrtype.map(Add => Add
        )
        const handleAddrTypeChange = (e) => console.log((addrtype[e.target.value]))
      
        return (
          < select
            onChange={e => handleAddrTypeChange(e)}
            className="browser-default custom-select" >
            {
              Add.map((address, key) => <option value={key}>{address}</option>)
            }
          </select >)
      
      
      }
