const React = require('react')
const { DragDropContext, Droppable, Draggable } = require('react-beautiful-dnd')

const DraggableList = props => {
  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) return

    // Provided list sorting method
    const list = Array.from(props.reorderedList || props.children)
    const [ removed ] = list.splice(result.source.index, 1)
    list.splice(result.destination.index + 1, 0, removed)

    typeof props.onDragEnd === 'function' && props.onDragEnd(list)
  }

  const {
    styleSheet: {
      list: listStyle = {},
      item: itemStyle = {}
    }
  } = props
  const list = props.reorderedList || props.children || []

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} style={listStyle}>
            {list.map((item, index) => (
              <Draggable key={index} draggableId={index} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...itemStyle,
                      ...provided.draggableProps.style
                    }}
                  >
                    {item}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

DraggableList.defaultProps = {
  styleSheet: {}
}

module.exports = DraggableList
