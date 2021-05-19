import React, { useState, cloneElement } from 'react'
import PropTypes from 'prop-types'

const Row = ({ children, title }) => {
  const [isExpanded, toggleExpand] = useState(false)

  return (
    <>
      <div
        onClick={() => toggleExpand(!isExpanded)}
        className="title"
      >
        {`${isExpanded ? '-' : '+'} ${title}`}
      </div>
      { isExpanded
        ? cloneElement(children)
        : null}
    </>
  )
}
Row.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}
export default Row
