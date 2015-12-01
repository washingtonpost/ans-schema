package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jackson.JsonLoader;
import java.io.IOException;
import java.net.URL;
import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.hamcrest.CoreMatchers.nullValue;
import static org.hamcrest.MatcherAssert.assertThat;

/**
 * <p>Static/helper methods that are used in Test classes not directly descending from Abstract*Tests</p>
 */
public class AbstractTestSupport {

    protected final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * @param resourcePath THe path to the resource to load
     * @return
     * @throws IOException
     */
    URL getResource(String resourcePath) throws IOException {
        return getClass().getClassLoader().getResource(resourcePath);
    }

    /**
     * @param fixtureName The name of the fixture in the same path as the test being executed, e.g. "credit".
     * @return
     * @throws IOException
     */
    URL getSisterPathResource(String fixtureName) throws IOException {
        return getResource(getClass().getPackage().getName().replace(".", "/") + "/" + fixtureName + ".json");
    }

    /**
     * @param fixtureName The name of the fixture in the same path as the test being executed, e.g. "credit".
     * @return
     * @throws IOException
     */
    JsonNode loadFixture(String fixtureName) throws IOException {
        return JsonLoader.fromPath(getSisterPathResource(fixtureName).getFile());
    }

    /**
     * @param schemaName The name of the schema to load, e.g. "credit".  This method assumes the schemas
     * live under a classpath resource schema/ans/v0_X/
     * @return
     * @throws IOException
     */
    JsonNode loadSchema(String schemaName) throws IOException {
        // Turns "com.washingtonpost.arc.ans.v0_x.model" into "schema/ans/v0_3/"
        String schemaResourceDir = getClass().getPackage().getName()
                .replace(".", "/")
                .replace("com/washingtonpost/arc", "schema")
                .replace("model", "");
        return JsonLoader.fromPath(getResource(schemaResourceDir + schemaName + ".json").getFile());
    }

    /**
     * @param clazz a class to test the .equals() and .hashCode method of
     */
    @SuppressWarnings("unchecked")
    void testEqualsAndHashCode(Class clazz) {
        if (!clazz.isInterface()) {
            EqualsVerifier.forClass(clazz)
                    .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                    .verify();
        }
    }

    /**
     * @param clazz a class to test that its .toString() method is defined/behaves (just for code coverage reasons, really)
     * @throws InstantiationException
     * @throws java.lang.IllegalAccessException
     */
    @SuppressWarnings("unchecked")
    public void testToString(Class clazz) throws InstantiationException, IllegalAccessException {
        if (!clazz.isInterface()) {
            assertThat(clazz.newInstance().toString(), is(not(nullValue())));
        }
    }
}
