<?php

namespace Tests\Unit;

use Tests\TestCase;

class AppBootTest extends TestCase
{
    public function test_app_resolves_core_service(): void
    {
        // Assert that the router service is bound
        $this->assertTrue($this->app->bound('router'));
    }
}
