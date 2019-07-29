import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { throttle } from 'lodash-es'

import Pane from './Pane'
import RelativePane from './RelativePane'
import FixedPane from './FixedPane'
import Wrapper from './Wrapper'
import Label from './Label'
import FindOrCreateNode from '../../utils/FindOrCreateNode'

const later = (callback) => setTimeout(requestAnimationFrame(callback), 0);

class Item extends React.PureComponent {
  static propTypes = {
    defaultDropDirection: PropTypes.oneOf(['up', 'down']),
    expanded: PropTypes.bool,
    throttle: PropTypes.number,
    dropToBody: PropTypes.bool,
    labelType: PropTypes.elementType,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    customLabel: PropTypes.elementType,
    customPane: PropTypes.elementType,
    customWrapper: PropTypes.elementType,
  }

  static defaultProps = {
    defaultDropDirection: 'down',
    expanded: false,
    throttle: 200,
    dropToBody: false,
    customLabel: Label,
    customPane: Pane,
    customWrapper: Wrapper,
  }

  constructor(props) {
    super(props)
    this.state = {
      expanded: props.expanded || false,
      pointUp: false,
      fixedX: 0,
      fixedY: 0,
    }

    this.toggleRef = React.createRef()
    this.dropRef = React.createRef()

    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleToggle = this.handleToggle.bind(this)

    this.handleScroll = this.handleScroll.bind(this)
    this.checkRects = throttle(this.checkRects.bind(this), props.throttle)
  }

  componentWillReceiveProps(props) {
    if (props.expanded != this.props.expanded && props.expanded != this.state.expanded) {
      this.setState({ expanded: props.expanded })
    }
  }

  handleToggle(evt) {
    evt.preventDefault()
    evt.stopPropagation()
    this.setState({ expanded: !this.state.expanded })
  }

  checkPointUp({ top: toggleTop, bottom: toggleBottom }, { height: dropHeight }) {
    const wh = window.innerHeight
    const downOK = (toggleBottom + dropHeight) <= wh
    const upOK = (toggleTop - dropHeight) >= 0
    return (this.props.defaultDropDirection === 'up') ? upOK : (upOK && !downOK)
  }

  updateDropPosition(toggleRect, dropRect) {
    const drop = this.dropRef && this.dropRef.current
    if (!toggleRect) {
      const toggle = this.toggleRef && this.toggleRef.current
      toggleRect = toggle && toggle.getBoundingClientRect()
    }
    if (!dropRect) {
      dropRect = drop && drop.getBoundingClientRect()
    }

    if (toggleRect && dropRect) {
      const pointUp = this.checkPointUp(toggleRect, dropRect)
      const maxWidth = window.innerWidth
      const fitWidth = (toggleRect.left + dropRect.width) <= maxWidth

      const fixedX = fitWidth ? toggleRect.left : (maxWidth - dropRect.width)
      const fixedY = pointUp ? (toggleRect.top - dropRect.height) : toggleRect.bottom
      if (drop && drop.style) {
        drop.style.transform = `translate3d(${fixedX}px, ${fixedY}px, 0)`
      }
      return { fixedX, fixedY }
    }
  }

  handleScroll() {
    if (!this.state.expanded) return
    if (this.props.dropToBody) this.updateDropPosition()
    this.checkRects()
  }

  handleClickOutside(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    if (!this.state.expanded) return

    const drop = this.dropRef && this.dropRef.current
    const toggle = this.toggleRef && this.toggleRef.current
    if (!(drop && toggle)) return

    if (drop.contains(evt.target) || toggle.contains(evt.target)) return

    this.setState({ expanded: false })
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, false)
    document.addEventListener('touchstart', this.handleClickOutside, false)
    document.addEventListener('scroll', this.handleScroll, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false)
    document.removeEventListener('touchstart', this.handleClickOutside, false)
    document.removeEventListener('scroll', this.handleScroll, false)
  }

  checkRects() {
    // no updates if no ref or not found some nodes
    const toggle = this.toggleRef && this.toggleRef.current
    const drop = this.dropRef && this.dropRef.current
    if (!(toggle && drop)) return

    // get rects when dropdown is opened
    const tr = toggle.getBoundingClientRect()
    const dr = drop.getBoundingClientRect()
    const pointUp = this.checkPointUp(tr, dr)

    if (this.props.dropToBody) {
      const upd = this.updateDropPosition(tr, dr)
      if (upd) this.setState(upd)
    } else {
      // check down display is ok
      // no refresh need if direction not updated
      if (this.state.pointUp === pointUp) return

      // update changed drop direction if need
      this.setState({ pointUp })
    }
  }

  renderDrop() {
    const { children, dropToBody, customPane: CustomPane } = this.props
    const { pointUp } = this.state

    if (dropToBody) {
      const renderNode = FindOrCreateNode('qwertyuisad')
      const { fixedX, fixedY } = this.state
      return ReactDOM.createPortal(
        <FixedPane as={CustomPane} children={children} fixedX={fixedX} fixedY={fixedY} ref={this.dropRef} />,
        renderNode
      )
    }

    return (
      <RelativePane as={CustomPane} children={children} position={pointUp ? 'up' : 'down'} ref={this.dropRef} />
    )
  }

  render() {
    const { label, customLabel: CustomLabel, customWrapper: CustomWrapper } = this.props
    const { expanded } = this.state

    later(this.checkRects)

    return (
      <CustomWrapper>
        <span onClick={this.handleToggle} ref={this.toggleRef}>
          <CustomLabel expanded={expanded} children={label} />
        </span>
        {expanded && this.renderDrop()}
      </CustomWrapper>
    )
  }
}

export default Item
