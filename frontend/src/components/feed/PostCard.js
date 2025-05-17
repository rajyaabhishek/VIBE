
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaRegComment, FaShare, FaRegPaperPlane } from 'react-icons/fa';
import { formatRelativeTime, formatNumber } from '../../utils/formatters';
import { getUserById } from '../../utils/mockData';
import { truncateText } from '../../utils/helpers';

const PostCard = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const author = getUserById(post.userId);
  const contentLength = post.content.length;
  const shouldTruncate = contentLength > 280 && !showFullContent;
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleComment = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      console.log('New comment:', commentText);
      setCommentText('');
      // In a real app, we would add the comment to the post
    }
  };
  
  return (
    <div className="feed-card">
      {/* Post header */}
      <div className="p-4 flex items-start">
        <Link to={`/profile/${author.id}`} className="flex-shrink-0">
          <img 
            src={author.profilePicture || "https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q"} 
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover" 
          />
        </Link>
        <div className="ml-3 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link to={`/profile/${author.id}`} className="font-medium text-black hover:underline">
                {author.name}
              </Link>
              <p className="text-gray-500 text-sm">{author.headline}</p>
              <div className="text-gray-400 text-xs flex items-center">
                {formatRelativeTime(post.timestamp)} • <span className="ml-1">🌍</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 mt-1 sm:mt-0">
              •••
            </button>
          </div>
        </div>
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-2">
        <div className="whitespace-pre-line">
          {shouldTruncate ? (
            <>
              {truncateText(post.content, 280)}
              <button 
                onClick={() => setShowFullContent(true)}
                className="text-gray-500 hover:text-gray-700 font-medium ml-1"
              >
                ...see more
              </button>
            </>
          ) : (
            post.content
          )}
        </div>
        
        {post.image && (
          <div className="mt-3">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto rounded-md" 
            />
          </div>
        )}
      </div>
      
      {/* Post stats */}
      <div className="px-4 py-1 flex items-center text-xs text-gray-500 border-b border-t border-gray-200">
        <div className="flex items-center">
          <span className="inline-flex bg-linkedin-blue text-white rounded-full p-1 mr-1">
            <FaThumbsUp className="h-2 w-2" />
          </span>
          {formatNumber(likeCount)}
        </div>
        <div className="ml-auto">
          {post.comments > 0 && (
            <button 
              onClick={() => setShowComments(!showComments)}
              className="hover:text-linkedin-blue hover:underline"
            >
              {formatNumber(post.comments)} comments
            </button>
          )}
          {post.shares > 0 && (
            <span className="ml-2">
              {formatNumber(post.shares)} shares
            </span>
          )}
        </div>
      </div>
      
      {/* Post actions */}
      <div className="px-2 py-1 flex justify-between">
        <button 
          onClick={handleLike}
          className={`reaction-btn ${liked ? 'text-linkedin-blue' : ''}`}
        >
          <FaThumbsUp className="h-4 w-4" />
          <span>Like</span>
        </button>
        <button 
          onClick={() => setShowComments(!showComments)}
          className="reaction-btn"
        >
          <FaRegComment className="h-4 w-4" />
          <span>Comment</span>
        </button>
        <button className="reaction-btn">
          <FaShare className="h-4 w-4" />
          <span>Share</span>
        </button>
        <button className="reaction-btn">
          <FaRegPaperPlane className="h-4 w-4" />
          <span>Send</span>
        </button>
      </div>
      
      {/* Comments section */}
      {showComments && (
        <div className="px-4 py-2 border-t border-gray-200">
          <form onSubmit={handleComment} className="flex items-center mb-3">
            <img 
              src="https://static.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" 
              alt="Your profile" 
              className="w-8 h-8 rounded-full mr-2" 
            />
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-linkedin-blue"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!commentText.trim()}
              className={`ml-2 text-linkedin-blue ${!commentText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:text-linkedin-darkBlue'}`}
            >
              Post
            </button>
          </form>
          
          {/* We would map through comments here in a real app */}
          <div className="text-center py-2 text-sm text-gray-500">
            Comments would appear here
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
