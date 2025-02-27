// src/components/landing/DrupalProjects/index.jsx
import React, { useState, useEffect } from 'react'
import { Container, Card } from 'components/common'
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const DrupalProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace 'jorgik1' with your Drupal.org username
    const username = '3297381'
    
    // Fetch projects from Drupal.org API
    fetch(`https://www.drupal.org/api-d7/user/${username}.json?type=project_project`)
      .then(response => response.json())
      .then(data => {
        setProjects(data.list || [])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching Drupal projects:', error)
        setLoading(false)
      })
  }, [])

  return (
    <Wrapper as={Container} id="drupal-projects">
      <h2>Drupal Projects</h2>
      {loading ? (
        <p>Loading Drupal projects...</p>
      ) : (
        <Grid>
          {projects.map(project => (
            <Item
              key={project.nid}
              as="a"
              href={`https://www.drupal.org${project.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card>
                <Content>
                  <h4>{project.title}</h4>
                  <p>{project.body?.summary || 'No description available'}</p>
                </Content>
                <Stats>
                  <div>
                    <span>Downloads: {project.project_usage_total || 'N/A'}</span>
                  </div>
                  <div>
                    <span>Version: {project.field_release_version || 'N/A'}</span>
                  </div>
                </Stats>
              </Card>
            </Item>
          ))}
          {projects.length === 0 && <p>No Drupal projects found.</p>}
        </Grid>
      )}
    </Wrapper>
  )
}