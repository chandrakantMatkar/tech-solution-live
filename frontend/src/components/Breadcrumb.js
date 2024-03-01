import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = (props) => {
    const navigate = useNavigate();
    const { paths } = props;
    const url = 'https://example.com/path/to/endpoint';
    const uniquePaths = paths.split('/').filter(segment=>segment!=='')
    console.log('paths',uniquePaths);
    console.log('window',window.location.pathname)
    const initialValue = '';
    const uniqueUrls = uniquePaths.reduce(
        (accumulator, currentValue) => accumulator +'/'+ currentValue,
        initialValue,
      );
    console.log('urls',uniqueUrls)
    const handleClick = (path)=>{
        navigate(`/${path}`)
    }
    return (
        <div>
            {
                uniquePaths.map((path, index)=>{
                    if (index!==(uniquePaths.length-1)) {
                        let url='';
                        for (let i = 0; i < uniquePaths.length; i++) {
                            const element = uniquePaths[i];
                            url +='/'+element                          
                            return <Link to={window.location.origin+url}> {path} / </Link>
                        }
                        console.log({url})
                    } else return <b>{path}</b> 
                })
            }            
        </div>
    )
}

export default Breadcrumb