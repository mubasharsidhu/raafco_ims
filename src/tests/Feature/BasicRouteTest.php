<?php

namespace Tests\Feature;

use Tests\TestCase;

class BasicRouteTest extends TestCase
{
    public function test_home_route_returns_200(): void
    {
        // Hit the root URL ("/") and assert HTTP 200
        $response = $this->get('/');
        $response->assertStatus(200);
    }
}
