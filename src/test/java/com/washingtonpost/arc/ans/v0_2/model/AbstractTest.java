package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import java.io.IOException;

/**
 * <p>Helper/common methods for JSON schema/test validation</p>
 */
public class AbstractTest {

    /**
     * @param fixtureName The name of the fixture in the same path as the test being executed, e.g. "credit".
     * @return
     * @throws IOException
     */
    JsonNode loadFixture(String fixtureName) throws IOException {
        String relativeFixturePath = getClass().getPackage().getName().replace(".", "/") + "/" + fixtureName + ".json";
        String fullFixturePathfile = getClass().getClassLoader().getResource(relativeFixturePath).getFile();
        return JsonLoader.fromPath(fullFixturePathfile);
    }

    /**
     * @param schemaName The name of the schema to load, e.g. "credit".  This method assumes the schemas
     * live under a classpath resource schema/ans/v0_2/
     * @return
     * @throws IOException
     */
    JsonNode loadSchema(String schemaName) throws IOException {
        String file = getClass().getClassLoader().getResource("schema/ans/v0_2/" + schemaName + ".json").getFile();
        return JsonLoader.fromPath(file);
    }
}
