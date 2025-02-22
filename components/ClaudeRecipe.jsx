import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

export default function ClaudeRecipe (props) {
    return <>
    {props.recipe === "Loading..." ? <div className="loader"></div> : 
    <section className="suggested-recipe-container" aria-live="polite">
            <h2 className='claude-recommends' ref={props.ref}>Chef Claude Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>}
  </>
}

ClaudeRecipe.propTypes = {
    recipe: PropTypes.string.isRequired,
    ref: PropTypes.object.isRequired
}
