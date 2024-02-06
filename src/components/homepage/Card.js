import { Link } from "react-router-dom"

export const Card = ({ _id, title, description, uploadedOn, image, comment, like, views }) => {
  return (
    <div style={{width: '25vw', height: '157.50px', overflow: 'hidden'}} >
      <div className="proj-imgbx" style={{borderRadius: '7px!important', height: '100%', width: '100%'}}>
        <img src={image} style={{height: '100%', width: '100%'}} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <div className="icons d-flex justify-content-evenly align-items-center" style={{margin:'1vw 0'}}>
            <i style={{color:'red', fontWeight:'700'}} className="bi bi-heart-fill"> &nbsp; {(like.length>=1000) ? ((like.length/1000).toFixed(1))+"K": like.length}</i>
            <i style={{color:'white', fontWeight:'700'}} className="bi bi-chat-fill"> &nbsp; {(comment.length>=1000) ? ((comment.length/1000).toFixed(1))+"K": comment.length}</i>
            <i style={{color:'blue', fontWeight:'700'}} className="bi bi-eye-fill"> &nbsp; {(views>=1000) ? ((views/1000).toFixed(1))+"K": views}</i>
          </div>
          <Link style={{color:"white", textDecoration:"none"}} to={`/view-note/${_id}`}><button>View!</button></Link>
        </div>
      </div>
    </div>
  )
}