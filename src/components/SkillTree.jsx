import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import config from '../data/config.json'
import './SkillTree.css'

const { lines: LINES, nodes: NODES, edges: EDGES, blocks: BLOCKS } = config.skillTree

const SORTED_NODES = [...NODES].sort((a, b) => a.year - b.year)

const ROW_HEIGHT = 100
const TOP_PADDING = 40
const LEFT_PADDING = 20
const GRID_SPACING = 170
const CARD_W = 130
const CARD_H = 64

const nodePositions = new Map()
const rowLastCol = new Map()
const yearCol = new Map()
let nextCol = 0

SORTED_NODES.forEach(node => {
  const line = LINES.find(l => l.id === node.line)
  const row = line.row
  const yr = Math.floor(node.year)

  if (!yearCol.has(yr)) yearCol.set(yr, nextCol)

  let col = yearCol.get(yr)
  const lastInRow = rowLastCol.get(row)
  if (lastInRow !== undefined && lastInRow >= col) col = lastInRow + 1

  rowLastCol.set(row, col)
  if (col >= nextCol) nextCol = col + 1
  nodePositions.set(node.id, { x: LEFT_PADDING + col * GRID_SPACING, row })
})

const GRID_W = LEFT_PADDING + nextCol * GRID_SPACING + 80
const GRID_H = TOP_PADDING + LINES.length * ROW_HEIGHT + 40

function rowToY(row) { return TOP_PADDING + row * ROW_HEIGHT + ROW_HEIGHT / 2 }

const LINE_ICONS = {
  'gen-world-model': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="12" cy="12" rx="4.5" ry="9" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  ),
  'gen-3d-object': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <path d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
      <path d="M2 8 L12 13 L22 8" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
    </svg>
  ),
  'gen-others': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="0.8" />
      <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  ),
  'edit-image': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <rect x="3" y="3" width="18" height="18" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 17 L8 12 L13 15 L17 10 L21 14" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="8.5" cy="8.5" r="2" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  ),
  'edit-3d': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <path d="M12 3 L21 8 V16 L12 21 L3 16 V8 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 3 L12 21" stroke="currentColor" strokeWidth="0.8" />
      <path d="M3 8 L12 13 L21 8" fill="none" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  ),
  'reconstruction': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  'perception': (
    <svg viewBox="0 0 24 24" className="st-card-icon">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
}

const SmallCard = React.forwardRef(({ node, onClick, isSelected, isConnected, style }, ref) => {
  const line = LINES.find(l => l.id === node.line)

  return (
    <div
      ref={ref}
      className={`st-card ${isSelected ? 'st-card-selected' : ''} ${isConnected ? 'st-card-connected' : ''} ${node.coauthor ? 'st-card-coauthor' : ''} ${node.highlight ? 'st-card-highlight' : ''} ${node.inProgress ? 'st-card-wip' : ''}`}
      style={style}
      onClick={onClick}
    >
      <div className="st-card-name-row">
        <div className="st-card-color-bar" style={{ borderColor: line?.color || 'var(--ash)' }} />
        <div className="st-card-name">{node.label}</div>
      </div>
      <div className="st-card-meta">
        {node.venue && <span className="st-card-venue">{node.venue}</span>}
        {node.tag && <span className="st-card-tag">{node.tag}</span>}
      </div>
      {node.stars >= 100 && <div className="st-card-stars">⭐ {node.stars}</div>}
    </div>
  )
})

function DetailPanel({ node }) {
  return (
    <motion.div
      key={node.id}
      className="st-detail-content"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.18 }}
    >
      <div className="st-detail-body">
        <div className="st-detail-title">{node.label}</div>

        <div className="st-detail-venue-row">
          <span className="st-detail-venue">{node.venue}</span>
          {node.tag && <span className="st-detail-tag">{node.tag}</span>}
          {node.stars && <span className="st-detail-stars">⭐ {node.stars}</span>}
        </div>

        <div className="st-detail-links">
          {node.paper && (
            <a href={node.paper} target="_blank" rel="noopener noreferrer" className="st-link-btn">
              [→] Paper
            </a>
          )}
          {node.link && (
            <a href={node.link} target="_blank" rel="noopener noreferrer" className="st-link-btn">
              [→] Code
            </a>
          )}
        </div>

        <div className="st-detail-tldr">{node.desc}</div>
      </div>
    </motion.div>
  )
}

function BlocksView({ blocks, nodes, selectedBlock, selected, setSelectedBlock, setSelected, handleCardClick, isVisible }) {
  const scrollRef = useRef(null)
  const [canScroll, setCanScroll] = useState({ left: false, right: false })

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScroll({
      left: el.scrollLeft > 10,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 10,
    })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || !isVisible) return

    const timer = setTimeout(() => {
      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    }, blocks.length * 150 + 400)

    el.addEventListener('scroll', checkScroll)
    checkScroll()
    return () => {
      clearTimeout(timer)
      el.removeEventListener('scroll', checkScroll)
    }
  }, [isVisible, blocks.length, checkScroll])

  return (
    <div className="st-blocks-wrapper">
      <div className="st-blocks-fade st-blocks-fade-left" style={{ opacity: canScroll.left ? 1 : 0 }} />
      <div className="st-blocks-fade st-blocks-fade-right" style={{ opacity: canScroll.right ? 1 : 0 }} />
      <div className="st-blocks-view" ref={scrollRef}>
        {blocks.map((block, bi) => {
          const isActive = selectedBlock === block.id
          const node = nodes.find(n => n.id === block.node)
          return (
            <React.Fragment key={block.id}>
              {bi > 0 && (
                <div className="st-block-arrow">
                  <svg width="32" height="24" viewBox="0 0 32 24">
                    <line x1="0" y1="12" x2="32" y2="12" stroke="var(--ash)" strokeWidth="1" strokeDasharray="4 3" className="st-block-arrow-line" />
                  </svg>
                </div>
              )}
              <motion.div
                className={`st-block ${isActive ? 'st-block-active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setSelectedBlock(isActive ? null : block.id); setSelected(null) }}
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : {}}
                transition={{ duration: 0.35, delay: bi * 0.15 }}
              >
                <div className="st-block-num">
                  {String(bi + 1).padStart(2, '0')} <span className="st-block-category">{block.title}</span>
                </div>
                <div className="st-block-img">
                  {block.image ? <img src={block.image} alt={block.title} /> : null}
                </div>
                <div className="st-block-venue-row">
                  {node && node.venue && node.venue !== 'Patent' && <span className="st-block-venue">{node.venue}</span>}
                  {node && node.tag && <span className="st-block-tag">{node.tag}</span>}
                  {node && node.stars > 0 && (
                    <span className="st-block-stars">⭐ {node.stars}</span>
                  )}
                </div>
                <div className="st-block-tagline">{block.tagline}</div>
                <div className="st-block-links" onClick={(e) => e.stopPropagation()}>
                  {node && node.paper && (
                    <a href={node.paper} target="_blank" rel="noopener noreferrer" className="st-block-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      Paper
                    </a>
                  )}
                  {node && node.link && (
                    <a href={node.link} target="_blank" rel="noopener noreferrer" className="st-block-link">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

function SkillTree() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const canvasRef = useRef(null)
  const cardRefs = useRef({})
  const [selected, setSelected] = useState(null)
  const [selectedBlock, setSelectedBlock] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [mode, setMode] = useState('main')
  const [edgePaths, setEdgePaths] = useState([])
  const dragStart = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onMouseDown = (e) => {
    if (!scrollRef.current) return
    dragStart.current = { x: e.clientX, scrollLeft: scrollRef.current.scrollLeft }
    setIsDragging(false)
  }
  const onMouseMove = (e) => {
    if (!dragStart.current || !scrollRef.current) return
    const dx = e.clientX - dragStart.current.x
    if (Math.abs(dx) > 4) setIsDragging(true)
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx
  }
  const onMouseUp = () => { dragStart.current = null }

  const handleCardClick = (e, node) => {
    if (isDragging) return
    e.stopPropagation()
    setSelected(node.id === selected ? null : node.id)
  }

  const handleModeSwitch = (newMode) => {
    setMode(newMode)
    setSelected(null)
    setSelectedBlock(null)
  }

  const selectedNode = NODES.find(n => n.id === selected)

  const connectedNodes = new Set()
  const connectedEdgeKeys = new Set()
  if (selected) {
    const walkUp = (nodeId) => {
      if (connectedNodes.has(nodeId)) return
      connectedNodes.add(nodeId)
      EDGES.forEach((edge) => {
        if (edge.to === nodeId) {
          connectedEdgeKeys.add(`${edge.from}-${edge.to}`)
          walkUp(edge.from)
        }
      })
    }
    walkUp(selected)
  }

  const groupedLines = LINES.reduce((acc, line) => {
    const group = line.group || line.label
    if (!acc[group]) acc[group] = []
    acc[group].push(line)
    return acc
  }, {})

  const computeEdges = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const canvasRect = canvas.getBoundingClientRect()

    const paths = EDGES.map(edge => {
      const fromEl = cardRefs.current[edge.from]
      const toEl = cardRefs.current[edge.to]
      if (!fromEl || !toEl) return null

      const fromRect = fromEl.getBoundingClientRect()
      const toRect = toEl.getBoundingClientRect()

      const fromCx = fromRect.left + fromRect.width / 2 - canvasRect.left
      const fromCy = fromRect.top + fromRect.height / 2 - canvasRect.top
      const toCx = toRect.left + toRect.width / 2 - canvasRect.left
      const toCy = toRect.top + toRect.height / 2 - canvasRect.top

      const sameCol = Math.abs(fromCx - toCx) < 20

      let x1, y1, x2, y2, d
      if (sameCol) {
        x1 = fromCx
        x2 = toCx
        const upper = fromCy < toCy
        y1 = upper ? fromRect.bottom - canvasRect.top : fromRect.top - canvasRect.top
        y2 = upper ? toRect.top - canvasRect.top : toRect.bottom - canvasRect.top
        const midY = y1 + (y2 - y1) * 0.5
        d = `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`
      } else {
        const leftToRight = fromCx < toCx
        x1 = leftToRight ? fromRect.right - canvasRect.left : fromRect.left - canvasRect.left
        x2 = leftToRight ? toRect.left - canvasRect.left : toRect.right - canvasRect.left
        y1 = fromCy
        y2 = toCy
        const midX = x1 + (x2 - x1) * 0.5
        d = `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`
      }

      return { d, key: `${edge.from}-${edge.to}` }
    }).filter(Boolean)

    setEdgePaths(paths)
  }, [])

  useEffect(() => {
    if (mode !== 'all' || !isVisible) return
    const timer = setTimeout(computeEdges, 50)
    return () => clearTimeout(timer)
  }, [mode, isVisible, computeEdges])

  return (
    <section className="st-section" id="skill-tree" ref={sectionRef} onClick={() => { setSelected(null); setSelectedBlock(null) }}>
      <div className="st-layout">
        <div className="st-mode-toggle" onClick={(e) => e.stopPropagation()}>
          <button
            className={`st-mode-btn ${mode === 'main' ? 'st-mode-btn-active' : ''}`}
            onClick={() => handleModeSwitch('main')}
          >
            Representative
          </button>
          <button
            className={`st-mode-btn ${mode === 'all' ? 'st-mode-btn-active' : ''}`}
            onClick={() => handleModeSwitch('all')}
          >
            All Works
          </button>
        </div>

        <div className="st-content-area">
            {mode === 'all' ? (
              <div className="st-left">
                <div className="st-labels" style={{ height: GRID_H }}>
                  {Object.entries(groupedLines).map(([groupName, groupLines]) => {
                    const hasGroup = groupLines[0].group
                    return (
                      <div key={groupName}>
                        {hasGroup && (
                          <div className="st-label-group" style={{ top: rowToY(groupLines[0].row) - 26 }}>
                            {groupName}
                          </div>
                        )}
                        {groupLines.map(line => (
                          <div
                            key={line.id}
                            className={`st-label ${hasGroup ? 'st-label-sub' : ''} ${selected && NODES.find(n => n.id === selected)?.line === line.id ? 'st-label-active' : ''}`}
                            style={{ top: rowToY(line.row) - 7 }}
                          >
                            {line.label}
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>

                <div
                  className="st-scroll"
                  ref={scrollRef}
                  onMouseDown={onMouseDown}
                  onMouseMove={onMouseMove}
                  onMouseUp={onMouseUp}
                  onMouseLeave={onMouseUp}
                >
                  <div className="st-canvas" ref={canvasRef} style={{ width: GRID_W, height: GRID_H }}>
                    <svg className="st-edge-svg" width={GRID_W} height={GRID_H}>
                      {edgePaths.map(ep => {
                        const highlighted = connectedEdgeKeys.has(ep.key)
                        return (
                          <path
                            key={ep.key}
                            d={ep.d}
                            fill="none"
                            stroke={highlighted ? 'var(--fg)' : 'var(--ash)'}
                            strokeWidth={highlighted ? 1.5 : 0.8}
                            strokeDasharray="4 3"
                            opacity={highlighted ? 0.7 : 0.35}
                            className={highlighted ? 'st-edge-flow' : ''}
                          />
                        )
                      })}
                    </svg>

                    {NODES.map((node) => {
                      const pos = nodePositions.get(node.id)
                      const line = LINES.find(l => l.id === node.line)
                      const y = rowToY(line.row)
                      const isSelected = selected === node.id
                      const isConnected = connectedNodes.has(node.id) && !isSelected

                      return (
                        <SmallCard
                          key={node.id}
                          ref={el => { cardRefs.current[node.id] = el }}
                          node={node}
                          isSelected={isSelected}
                          isConnected={isConnected}
                          onClick={(e) => handleCardClick(e, node)}
                          style={{
                            position: 'absolute',
                            left: pos.x,
                            top: y - CARD_H / 2,
                            width: CARD_W,
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <BlocksView
                blocks={BLOCKS}
                nodes={NODES}
                selectedBlock={selectedBlock}
                selected={selected}
                setSelectedBlock={setSelectedBlock}
                setSelected={setSelected}
                handleCardClick={handleCardClick}
                isVisible={isVisible}
              />
            )}
        </div>

        <div className="st-scroll-hint">← drag to scroll →</div>

        <AnimatePresence mode="wait">
          {mode === 'all' && selectedNode && (
            <motion.div
              className="st-detail"
              key={`node-${selected}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DetailPanel node={selectedNode} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="st-footer">
          <div className="st-footer-links">
            <a href="mailto:imlixinyang@gmail.com">imlixinyang@gmail.com</a>
            <a href="https://github.com/imlixinyang" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">Scholar</a>
          </div>
          <div className="st-footer-note">Xinyang Li · 2026</div>
        </div>
      </div>
    </section>
  )
}

export default SkillTree
