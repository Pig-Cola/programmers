import * as fs from 'fs'
import path from 'path'

/** @type {(dir:string targetDir:string)} */
async function renameIconFile( dir ) {
  /**@type {string[]} */
  let files = await fs.promises.readdir( dir ).catch( ( err ) => {
    throw err
  } )

  let result = await Promise.all(
    files.map( ( v ) => {
      return fs.promises.stat( path.join( dir, v ) )
    } ),
  )
  let name = /.*Name=(?<name>[A-Za-z_ \-]+).*/
  let state = /.*State=(?<state>[A-Za-z_ \-]+).*/
  let type = /.*Type=(?<type>[A-Za-z_ \-]+).*/

  for ( let i = 0; i < result.length; i++ ) {
    if ( result[i].isDirectory() || !/\.svg$/.test( files[i] ) ) {
      continue
    }

    let { name: iconName } = files[i].match( name ).groups
    let { state: iconState } = files[i].match( state ).groups
    let { type: iconType } = files[i].match( type ).groups
    let rename = `${iconName.split( ' ' ).join( '-' )}${iconType ? '_' + iconType.split( ' ' ).join( '-' ) : ''}${
      iconState && iconState !== 'None' ? '_' + iconState.split( ' ' ).join( '-' ) : ''
    }.svg`

    let tempDir = path.join( dir, files[i] )
    let tempTargetDir = path.join( dir, rename )

    await fs.promises.rename( tempDir, tempTargetDir ).catch( ( err ) => {
      throw err
    } )
  }
}

// ex)
renameIconFile( 'C:\\Users\\rsefa\\Desktop\\toest문서\\figma_svg\\t' )
