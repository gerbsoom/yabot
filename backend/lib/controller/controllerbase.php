<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Base class for all controllers which forces to provide a validate and executeAction function.
 */
abstract class ControllerBase
{
    /** @var  Monolog\Logger */
    protected $log;
    /** @var CacheController  */
    protected $cache;
    /** @var  BackendResult */
    protected $backendResult;
    protected $params = array();
    protected $maxSessionTimeout = 1500;

    /**
     * Constructs the controller and sets up the BackendResult.
     *
     * @param array $_params The parameters with which the controller action is called.
     */
    function __construct($_params = array())
    {
        $this->params = $_params;
        $this->cache = new CacheController();
        $this->backendResult = new BackendResult($_params);
        $this->log = LoggerRegistry::getLogger($this);
    }

    /**
     * Validates the provided action parameters and decides if the action is executed.
     *
     * @return bool True means that the provided parameters are valid and the action can be triggered.
     */
    abstract public function validateParameters();

    /**
     * Executes the requested action and returns the BackendResult as JSON string.
     *
     * @return string Contains the BackendResult as JSON string.
     */
    abstract public function executeAction();

    /**
     * Checks if the user is allowed to trigger the action.
     *
     * // toDo: Could be the place to check for registered/loggedIn and session timeouts.
     *
     * @return bool True means that the user is allowed to trigger the action.
     */
    public function checkPermissions()
    {
        return true;
    }

    /**
     * Returns a short action ID for logging purposes.
     *
     * @return string A short action ID.
     */
    function actionId()
    {
        return "[".$this->params["controller"]."::".$this->params["action"]."]";
    }

    /**
     * Returns the action parameters as JSON string for debugging purposes.
     *
     * @return string The action parameters as JSON string.
     */
    function debugParameters()
    {
        return json_encode($this->params);
    }

}
