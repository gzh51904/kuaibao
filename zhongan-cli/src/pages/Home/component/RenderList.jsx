import React from 'react'
import '../scss/Gcomponent.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
class RenderList extends React.Component{
    constructor(){
        super();
        this.state={
            insurance:[],
            type:[],
        }
        this.gotoGoods=this.gotoGoods.bind(this);
    }
    gotoGoods(data){
        this.props.history.push('/goods/'+data
         )

    }
    async componentWillMount(){
        let {data} = await axios.get('http://47.94.157.240:2017/zhongangoods',{
            params:{categoryOneName:this.props.type}
        });
        // console.log(data);
        let typearr = [];
        data.forEach(item=>{
            if(typearr.length===0){
                typearr.unshift(item.categoryTwoName)
            }
            else{
                if(typearr.some(ite=>ite===item.categoryTwoName)===false){
                    typearr.unshift(item.categoryTwoName);
                }
            }
        })
        this.setState({
            insurance:data,
            type:typearr
        })

    }

    render(){
        return <div className='g_blank'>
        <div className="g_twotab">
            {
                this.state.type.map((item,idx)=><span key={idx}>{item}</span>)
            }
       </div>
       {
           this.state.type.map((ite,idx)=>{
               return (
                   <ul className='g_baoxian' key={idx+100}>
                      <h3>{ite}</h3>
                      {
                          this.state.insurance.map(item=>{
                              if(ite===item.categoryTwoName){
                                  return(
                                      <li key={item.goodsCode}  onClick={this.gotoGoods.bind(this,item.goodsCode)}>
                                          <img src={item.imageUrl} alt=""/>
                                          <div className="miaoshu">
                                              <h5>{item.title}</h5>
                                              <p>{item.summary}</p>
                                              <p><span>￥</span><span>{item.price}</span>   起</p>
                                          </div>
                                      </li> 
                                  ) 
                              }
                              return null
                          })
                      }
                  </ul>   
              ) 
          })
       }

  </div>
    }
}
RenderList = withRouter(RenderList)
export default RenderList;