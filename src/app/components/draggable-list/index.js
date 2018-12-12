const React = require('react')
const { DragDropContext, Draggable, Droppable } = require('react-beautiful-dnd')

// a little function to help us with reordering the result
function reorder (list, startIndex, endIndex) {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

function onDragEndHandler (props) {
  return result => {
    // dropped outside the list
    if (!result.destination) return

    const items = reorder(
      props.reorderedList || props.children,
      result.source.index,
      result.destination.index
    )

    typeof props.onDragEnd === 'function' && props.onDragEnd(items)
  }
}

const DraggableList = props => {
  const {
    styleSheet: {
      list: listStyle = {},
      item: itemStyle = {}
    }
  } = props
  const onDragEnd = onDragEndHandler(props)
  const list = props.reorderedList || props.children

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {provided => (
          <div
            ref={provided.innerRef}
            style={listStyle}
            {...provided.droppableProps}
          >
            {list.map((item, index) => (
              <Draggable
                key={item.props.id}
                draggableId={item.props.id}
                index={index}
              >
                {provided => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={{
                        ...itemStyle,
                        ...provided.draggableProps.style
                      }}
                    >
                      {item}
                    </div>
                    {provided.placeholder}
                  </div>
                 )}
              </Draggable>
             ))}
            {provided.placeholder}
          </div>
         )}
      </Droppable>
    </DragDropContext>
  )
}

DraggableList.defaultProps = {
  children: [],
  styleSheet: {}
}

module.exports = DraggableList
