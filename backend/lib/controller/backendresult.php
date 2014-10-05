<?php
/**
 * This file is part of yaBotGame.
 * Please check the file LICENSE.md for information about the license.
 *
 * @copyright Markus Riegert 2014
 * @author Markus Riegert <desmodul@drow-land.de>
 */

/**
 * Represents the result of a backend call which gets JSON-encoded and returned to the frontend.
 */
class BackendResult
{
    const STATUS_OK = 1;
    const STATUS_NOT_OK = 2;

    public $controller;
    public $action;
    public $actionParameters;

    public $status;
    public $errorMessage;

    public $generatedData;

    /**
     * Constructs the BackendResult with all provided action parameters.
     *
     * @param array $_actionParameters The action parameters with which the action was called.
     */
    function __construct($_actionParameters)
    {
        $this->controller = $_actionParameters["controller"];
        $this->action = $_actionParameters["action"];
        $this->actionParameters = $_actionParameters;
    }

    /**
     * Sets the generated data.
     *
     * @param mixed $_generatedData The generated data which gets returned to the caller.
     */
    public function setData($_generatedData)
    {
        $this->generatedData = $_generatedData;
    }

    /**
     * Sets the status of the result and an optional error messages.
     *
     * @param int $status The new status
     * @param string $errorMessage
     */
    public function setResult($status, $errorMessage="")
    {
        $this->status = $status;
        $this->errorMessage = $errorMessage;
    }

}
