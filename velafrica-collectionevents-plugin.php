<?php
/**
 * Velafrica Collectionevents
 *
 * @package     Wpackio
 * @author      Swashata Ghosh
 * @copyright   2021 Velafrica
 * @license     GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: Velafrica Collectionevents
 * Plugin URI:  https://github.com/velafrica/velafrica-wpack-collectionevents
 * Description: Wordpress Plugin zum Laden der Sammelanlässe. (Shortcode: [velafrica-collectionevents])
 * Version:     0.0.6
 * Author:      Platzh1rsch
 * Author URI:  https://platzh1rsch.ch
 * Text Domain: velafrica
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Define plugin path
define( 'VELAFRICA_COLLECTIONEVENTS_PLUGIN', __FILE__ );

// Get our autoloader from composer
require_once __DIR__ . '/vendor/autoload.php';

// Get our own plugin classes, we could (and **SHOULD**) use autoload here too, but let's skip it
require_once __DIR__ . '/inc/class-velafrica-collectionevents-plugin-init.php';

// Do stuff through this plugin
// Init
new Velafrica_Collectionevents_Plugin_Init();
