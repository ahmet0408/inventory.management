const AddProduct = () => {

    const [productData, setProductData] = useState({
        productTranslates: [
          { name: "",description:"", languageCulture: "tk" },
          { name: "",description:"", languageCulture: "ru" },
          { name: "",description:"", languageCulture: "en" },
        ],
        order: 0,
        amount:0,
        barcode:"",
        price:0,
        status:"",
        formImage:null,
        categoryId:0,
        departmentId:0,
        employeeId:0
      });

      const [categories, setCategories] = useState([]);
      const [employees, setEmployees] = useState([]);
      const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      fetch("https://localhost:5001/api/department")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setDepartments(data))
        .catch((error) => setError(error.message));
    }, []);

    useEffect(() => {
        fetch("https://localhost:5001/api/employee")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => setEmployees(data))
          .catch((error) => setError(error.message));
      }, []);

      useEffect(() => {
          fetch("https://localhost:5001/api/category")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => setCategories(data))
            .catch((error) => setError(error.message));
        }, []);

        const handleTranslationChange = (index, value) => {
            const updatedTranslates = [...productData.productTranslates];
            updatedTranslates[index].name = value;
        
            setCategoryData((prev) => ({
              ...prev,
              categoryTranslates: updatedTranslates,
            }));
          };
    return (
        <>
        </>
    )
}