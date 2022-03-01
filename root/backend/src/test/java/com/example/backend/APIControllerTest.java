package com.example.backend;

import handlers.IApiHandler;
import handlers.RedditApiHandler;
import handlers.TwitterApiHandler;
import handlers.YoutubeApiHandler;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import java.util.List;


class APIControllerTest extends APIController{
    @Test
    void testBuildHandlerName()
    {
        List<String> testName = buildHandlerNames(true, true, false);
        assert(testName.size() == 2);
    }

    @Test
    void testBuildHandlerName1()
    {
        List<String> testName = buildHandlerNames(false, true, false);
        assert(testName.size() == 1);
    }

    @Test
    void testBuildHandlerName2()
    {
        Assertions.assertThrows(AssertionError.class, () -> {
            List<String> testName = buildHandlerNames(true, true, true);
            assert(testName.size() == 2);
        });
    }
}